import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'

export const RulesPage = () => {
  const { id = '' } = useParams()
  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
  return(
    <div className={styles.rules}>
      <h2 className={styles.rulesTitle}>{eventInfo?.rules?.rule_name}</h2>
      <div className={eventInfo?.rules?.rule_text ? styles.rulesText : ''}>
        {eventInfo?.rules?.rule_text && (
          <div dangerouslySetInnerHTML={{ __html: eventInfo?.rules?.rule_text }} />
        )}
      </div>
    </div>
  )
}