import { useGetAllVidsQuery } from 'src/store/vids/vids.api'
import styles from './index.module.scss'
import { FunCard } from 'src/components/fun-card/fun-card'

export const ParticipantEnjoy = () => {
  const {data: funData } = useGetAllVidsQuery(1)
  return (
    <div className={styles.funList}>
      {funData?.vids.map((funElem) => {
        return <FunCard key={funElem.id} {...funElem} />
      })}
    </div>
  )
}