import { type FC } from 'react'
import { type ProgramListItem } from 'src/types/program'

import skeleton from 'src/assets/img/skeleton-img.png'
import styles from './index.module.scss'
import { MainButton } from 'src/UI/MainButton/MainButton'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/routes/main-routes/consts'

type ProgramListProps = {
  list: ProgramListItem[]
  viewMode: string
}

export const ProgramList: FC<ProgramListProps> = ({ list, viewMode = 'list' }) => {
  if (!list?.length) return null
  return (
    <>
      {viewMode === 'list' ? (
        <ul className={styles.listProgram}>
          {list.map((programEL) => (
            <li key={programEL.id}>
              <p className={styles.programTime}>{programEL.time}</p>
              <span className={styles.programPlace}>{programEL.place}</span>
              <Link to={`${AppRoute.EventProgram}/${programEL.id}`}>
                <span className={styles.programTitle}>{programEL.title}</span>
              </Link>
              {
                /*
                {programEL.use_reg === 1 && (
                  <MainButton as='route' to={'#'} className={styles.requestBtn}>
                    Подать заявку
                  </MainButton>
                )}
                */
              }
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.listTabs}>
          {list.map((programEL) => (
            <figure className={styles.listTabCard} key={programEL.id}>
              <div className={styles.imgWrapper}>
                <img src={skeleton} alt='' />
              </div>
              <figcaption>
                <Link to={`${AppRoute.EventProgram}/${programEL.id}`}>
                  <h3 className={styles.programTitle}>{programEL.title}</h3>
                </Link>
                <p className={styles.programTime}>{programEL.time}</p>
                <p className={styles.programPlace}>{programEL.place}</p>
                {
                /*
                {programEL.use_reg === 1 && (
                  <MainButton as='route' to={'#'} className={styles.requestBtn}>
                    Подать заявку
                  </MainButton>
                )}
                */
              }
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  )
}

