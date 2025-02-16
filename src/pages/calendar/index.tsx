import React, { useEffect, useState } from 'react';
import { Calendar, Badge, Modal } from 'antd';
import type { CalendarProps, BadgeProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import './style.scss';
import { getEventList } from '../../redux/slices/event.slices';

export const CalendarEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { eventList } = useSelector((state: RootState) => state.events);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = eventList
      .filter((event: any) => value.isSame(event.date, 'day'))
      .map((event: any) => ({ type: 'success', content: event.title, event }));

    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} onClick={() => handleEventClick(item.event)}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const monthCellRender = (value: Dayjs) => {
    const monthEvents = eventList.filter((event: any) =>  value.isSame(event.date, 'month'));
    return (
    <div>
      <div>{value.format('MMMM')}</div>
      {monthEvents.length > 0 && (
        <div style={{ 
          fontSize: '12px', 
          color: '#40a76b',
          marginTop: '4px' 
        }}>
          {monthEvents.length} {monthEvents.length === 1 ? 'Event' : 'Events'}
        </div>
      )}
    </div>

    )
  };

  return (
    <div className="main-table">
      <Calendar
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
      <Modal
        visible={isModalVisible}
        title="Event Details"
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedEvent && (
          <div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p>Date: {selectedEvent.date}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};