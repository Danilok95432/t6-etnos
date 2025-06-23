import { EtnosportCard } from 'src/components/etnosport-card/etnosport-card'
import styles from './index.module.scss'
import { useGetAllVidsQuery } from 'src/store/vids/vids.api'

export const ParticipantEtnosport = () => {
  const {data: etnoData } = useGetAllVidsQuery(0)
  return(
    <div className={styles.etnosportList}>
      {
        etnoData?.vids.map((etnoElem) => {
          return <EtnosportCard key={etnoElem.id} {...etnoElem} />
        })
      }
    </div>
  )
}