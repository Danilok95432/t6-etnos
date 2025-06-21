import styles from './index.module.scss'
import { FunCard } from 'src/components/fun-card/fun-card'

export const FunList = () => {
  const funs = [
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
    <div className={styles.funList}>
      {
        funs.map((funElem) => {
          return <FunCard key={funElem.id} {...funElem} />
        })
      }
    </div>
  )
}