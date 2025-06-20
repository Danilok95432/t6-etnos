import { EtnosportCard } from 'src/components/etnosport-card/etnosport-card'
import styles from './index.module.scss'

export const ParticipantEtnosport = () => {
  const etnosport = [
    {
      id: '1',
      title: 'Борьба-за-вороток',
      photo: [],
      type: 'Одиночный вид',
      teams: '',
      participants: '220'
    },
    {
      id: '2',
      title: 'Кила',
      type: 'Групповой вид',
      photo: [],
      teams: '100',
      participants: '892'
    },
    {
      id: '3',
      title: 'Русский мяч',
      photo: [],
      type: 'Групповой вид',
      teams: '100',
      participants: '892'
    }
  ] 
  return(
    <div className={styles.etnosportList}>
      {
        etnosport.map((etnoElem) => {
          return <EtnosportCard key={etnoElem.id} {...etnoElem} />
        })
      }
    </div>
  )
}