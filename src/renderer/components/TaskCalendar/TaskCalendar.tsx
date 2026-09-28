import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { Badge, Calendar, Empty, Icon, List, Radio, Tag, Tooltip } from 'antd';
import { RootState } from '../../reducers';
import { KanbanBoardState } from '../Kanban/Board/action';
import { ListsState } from '../Kanban/type';
import { CardsState } from '../Kanban/Card/action';
import { actions as kanbanActions, KanbanActionTypes } from '../Kanban/action';
import { actions as timerActions, TimerActionTypes } from '../Timer/action';
import { genMapDispatchToProp } from '../../utils';

const Container = styled.div`
    padding: 16px 24px;
    max-width: 1100px;
    margin: 0 auto;

    .ant-fullcalendar-value {
        color: inherit;
    }
`;

const TaskList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    max-height: 84px;
    overflow-y: auto;
`;

const TaskItem = styled.li`
    margin: 1px 0;

    .ant-tag {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
`;

const ScrollList = styled.div`
    max-height: 60vh;
    overflow-y: auto;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 0 16px;
`;

const TaskRow = styled(List.Item)`
    cursor: pointer;

    &:hover {
        background: #fafafa;
    }
`;

const TaskRowMain = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

const TaskTitle = styled.span`
    font-weight: 500;
`;

const BOARD_COLORS = [
    'magenta',
    'volcano',
    'gold',
    'green',
    'cyan',
    'blue',
    'purple',
    'geekblue',
    'orange',
    'lime',
];

const colorForBoard = (boardId: string) => {
    let hash = 0;
    for (let i = 0; i < boardId.length; i += 1) {
        hash = (hash * 31 + boardId.charCodeAt(i)) | 0;
    }

    return BOARD_COLORS[Math.abs(hash) % BOARD_COLORS.length];
};

const dueColor = (dueTime: number, now: Moment) => {
    if (dueTime < now.valueOf()) {
        return 'red';
    }

    if (dueTime - now.valueOf() < 24 * 60 * 60 * 1000) {
        return 'orange';
    }

    return 'blue';
};

interface TaskEntry {
    cardId: string;
    listId: string;
    boardId: string;
    boardName: string;
    title: string;
    dueTime: number;
}

interface Props extends KanbanActionTypes, TimerActionTypes {
    boards: KanbanBoardState;
    lists: ListsState;
    cards: CardsState;
}

const _TaskCalendar: FC<Props> = (props: Props) => {
    const { boards, lists, cards } = props;
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    const tasks = React.useMemo(() => {
        const entries: TaskEntry[] = [];
        for (const board of Object.values(boards)) {
            for (const listId of board.lists) {
                const list = lists[listId];
                if (!list) {
                    continue;
                }

                for (const cardId of list.cards) {
                    const card = cards[cardId];
                    if (!card || !card.dueTime) {
                        continue;
                    }

                    entries.push({
                        cardId,
                        listId,
                        boardId: board._id,
                        boardName: board.name,
                        title: card.title,
                        dueTime: card.dueTime,
                    });
                }
            }
        }

        entries.sort((a, b) => a.dueTime - b.dueTime);
        return entries;
    }, [boards, lists, cards]);

    const tasksByDay = React.useMemo(() => {
        const map = new Map<string, TaskEntry[]>();
        for (const task of tasks) {
            const key = moment(task.dueTime).format('YYYY-MM-DD');
            const list = map.get(key) ?? [];
            list.push(task);
            map.set(key, list);
        }

        return map;
    }, [tasks]);

    const openTask = React.useCallback(
        (task: TaskEntry) => {
            props.changeAppTab('kanban');
            props.setChosenBoardId(task.boardId);
            props.setEditCard(true, task.listId, task.cardId);
        },
        [props.changeAppTab, props.setChosenBoardId, props.setEditCard]
    );

    const dateCellRender = React.useCallback(
        (date: Moment) => {
            const key = date.format('YYYY-MM-DD');
            const dayTasks = tasksByDay.get(key);
            if (!dayTasks || dayTasks.length === 0) {
                return null;
            }

            const isOverdue = date.isBefore(moment(), 'day');
            return (
                <TaskList>
                    {dayTasks.map((task) => (
                        <TaskItem key={task.cardId}>
                            <Tooltip
                                title={`${task.boardName} · ${moment(task.dueTime).format('HH:mm')}`}
                            >
                                <Tag
                                    color={isOverdue ? 'red' : colorForBoard(task.boardId)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openTask(task);
                                    }}
                                >
                                    {task.title}
                                </Tag>
                            </Tooltip>
                        </TaskItem>
                    ))}
                </TaskList>
            );
        },
        [tasksByDay, openTask]
    );

    const now = moment();
    const overdueCount = tasks.filter((t) => t.dueTime < now.valueOf()).length;
    const todayCount = tasks.filter(
        (t) => t.dueTime >= now.valueOf() && moment(t.dueTime).isSame(now, 'day')
    ).length;
    const upcomingCount = tasks.length - overdueCount - todayCount;

    return (
        <Container>
            <div
                style={{
                    marginBottom: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                }}
            >
                <div>
                    <Badge
                        status="error"
                        text={`${overdueCount} overdue`}
                        style={{ marginRight: 16 }}
                    />
                    <Badge
                        status="warning"
                        text={`${todayCount} due today`}
                        style={{ marginRight: 16 }}
                    />
                    <Badge status="processing" text={`${upcomingCount} upcoming`} />
                </div>
                <Radio.Group
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    size="small"
                >
                    <Radio.Button value="calendar">
                        <Icon type="calendar" /> Calendar
                    </Radio.Button>
                    <Radio.Button value="list">
                        <Icon type="unordered-list" /> List
                    </Radio.Button>
                </Radio.Group>
            </div>
            {tasks.length === 0 ? (
                <Empty
                    description={
                        "No tasks with a deadline yet. Set a 'To Do Before' date on a card to see it here."
                    }
                />
            ) : view === 'calendar' ? (
                <Calendar dateCellRender={dateCellRender} />
            ) : (
                <ScrollList>
                    <List
                        dataSource={tasks}
                        renderItem={(task) => (
                            <TaskRow key={task.cardId} onClick={() => openTask(task)}>
                                <TaskRowMain>
                                    <Tag color={colorForBoard(task.boardId)}>
                                        {task.boardName}
                                    </Tag>
                                    <TaskTitle>{task.title}</TaskTitle>
                                    <Tag color={dueColor(task.dueTime, now)}>
                                        <Icon type="clock-circle" />{' '}
                                        {moment(task.dueTime).format('MMM D, YYYY HH:mm')}
                                    </Tag>
                                </TaskRowMain>
                            </TaskRow>
                        )}
                    />
                </ScrollList>
            )}
        </Container>
    );
};

const mapStateToProps = (state: RootState) => ({
    boards: state.kanban.boards,
    lists: state.kanban.lists,
    cards: state.kanban.cards,
});

export const TaskCalendar = connect(
    mapStateToProps,
    genMapDispatchToProp<KanbanActionTypes & TimerActionTypes>({
        ...kanbanActions,
        ...timerActions,
    })
)(_TaskCalendar);
