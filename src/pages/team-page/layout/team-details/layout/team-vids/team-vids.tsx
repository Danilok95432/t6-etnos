import { useGetAllVidsQuery } from 'src/store/vids/vids.api'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

export const TeamVids = () => {
  const { data: vidsList } = useGetAllVidsQuery(1)
  return (
    <div className={styles.teamVidsPage}>
      <h2>Виды</h2>
      <div className={styles.vidsList}>
        {
          vidsList?.vids.map((vid) => {
            return(
              <Link to={`/${AppRoute.About}/${AppRoute.AboutFun}/${vid.id}`}>
                <div className={styles.vidElem}>
                  <h4>{vid.title}</h4>
                  <p>{vid.desc !== '' ? vid.desc : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
