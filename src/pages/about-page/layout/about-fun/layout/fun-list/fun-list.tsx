import styles from './index.module.scss'
import { FunCard } from 'src/components/fun-card/fun-card'
import { useGetAllVidsQuery } from 'src/store/vids/vids.api'

export const FunList = () => {
  const {data: funData } = useGetAllVidsQuery(0)
  return (
    <div className={styles.funList}>
      {funData?.vids.map((funElem) => {
        return <FunCard key={funElem.id} {...funElem} />
      })}
    </div>
  )
}
