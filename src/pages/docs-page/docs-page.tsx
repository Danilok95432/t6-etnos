import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useGetEventByIdQuery } from 'src/store/events/events.api'

export const DocsPage = () => {
  const { id = '' } = useParams()
  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')
  return(
    <div className={styles.docs}>
      <h2 className={styles.docsTitle}>{eventInfo?.rules?.politic_name}</h2>
      <div className={eventInfo?.rules?.politic_text ? styles.docsText : ''}>
        {eventInfo?.rules?.politic_text && (
          <div dangerouslySetInnerHTML={{ __html: eventInfo?.rules?.politic_text }} />
        )}
      </div>
    </div>
  )
}