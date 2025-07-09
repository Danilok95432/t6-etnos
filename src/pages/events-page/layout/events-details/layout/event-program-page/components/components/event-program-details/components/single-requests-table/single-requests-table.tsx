import { useState, type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { ParticipantCard } from 'src/components/participant-card/participant-card'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { ParticipantItem } from 'src/types/participants'
import { MobileList } from 'src/components/mobile-list/mobile-list'
import { formatSingleDate, parseTimeFromDate } from 'src/helpers/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEventParticipantsByIdQuery } from 'src/store/events/events.api'

type SingleRequstsTableProps = {
  view?: string
}

export const SingleRequstsTable: FC<SingleRequstsTableProps> = ({ view = 'list' }) => {
  const { id } = useParams()
  const { data: eventDataParticipants } = useGetEventParticipantsByIdQuery(id ?? '')

  const breakpoint = useBreakPoint()
  const navigate = useNavigate()

  const rowClickHandler = (id: string) => {
		navigate(`/participants/${id}`)
	}

  const tableTitles = [
    'ID',
    'Фото',
    'Имя, фамилия, прозвище',
    'Регион',
    'Возраст',
    'Регистрация',
  ]
  const formatEventsTableData = (participants: ParticipantItem[]) => {
  return participants?.map((participantEl) => {
    return {
      rowId: participantEl.id,
      cells: [
        <p key='0' className={styles.idCell}>{participantEl.id}</p>,
        <img key='1' src={participantEl.photo?.[0]?.original ?? ''} alt='' />,
        <p key='2'>{`${participantEl.surname} ${participantEl.firstname} ${participantEl.fathname}`}</p>,
        <p key='3'>{participantEl.region_name}</p>,
        <p className={styles.ageCell} key='4'>{participantEl.age}</p>,
        <p key='4'>
          {formatSingleDate(participantEl.createdate ?? new Date())}
          <br />
          {parseTimeFromDate(participantEl.createdate)}
        </p>,
      ],
    }
  })
}

  return (
    <div className={styles.participantsSection}>
      {view === 'list' && eventDataParticipants && breakpoint !== 'S' ? (
        <CustomTable
          className={styles.participantsTable}
          rowData={formatEventsTableData(eventDataParticipants.reg_users ?? [])}
          colTitles={tableTitles}
          rowClickHandler={rowClickHandler}
        />
      ) : (
        <MobileList
          items={eventDataParticipants?.reg_users ?? []}
          renderItem={ParticipantCard}
          classListItems={styles.participantsTab}
          defaultVisibleCount={3}
          classNameBtn={styles.showMoreBtnTab}
        />
      )}
    </div>
  )
}

