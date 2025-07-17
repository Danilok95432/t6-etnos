import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const EtnosportRules = () => {
  const { id = '' } = useParams()
  const { data: etnoData } = useGetVidInfoByIdQuery(id ?? '')
  return(
    <div className={styles.etnosportRulesPage}>
      <h3>Правила</h3>
      <p>{etnoData?.vids.rule}</p>
    </div>
  )
}