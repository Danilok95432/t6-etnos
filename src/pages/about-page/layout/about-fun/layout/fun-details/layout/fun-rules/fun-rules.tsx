import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useGetVidInfoByIdQuery } from 'src/store/vids/vids.api'

export const FunRules = () => {
  const { id = '' } = useParams()
  const { data: funData } = useGetVidInfoByIdQuery(id ?? '')
  return(
    <div className={styles.funRulesPage}>
      <h3>Правила</h3>
      <p>
        Правила игры в {funData?.vids.title}:
      </p>
      <p>{funData?.vids.rule}</p>
    </div>
  )
}