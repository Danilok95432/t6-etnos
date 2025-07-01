import { RefObject, useEffect, useMemo, useRef, useState, type FC } from 'react'

import { useParams } from 'react-router-dom'
import {
  useGetEventByIdQuery,
  useGetEventNewsByIdQuery,
  useGetEventProgramByIdQuery,
  useGetEventVideosByIdQuery,
} from 'src/store/events/events.api'

import { RenderedArray } from 'src/components/rendered-array/rendered-array'
import { AccordionItem } from 'src/components/accordion-item/accordion-item'

import styles from './index.module.scss'
import { GalleryImg } from 'src/components/image-gallery/image-gallery'
import { DetailedAside } from 'src/modules/detailedAside/detailedAside'
import { type ImageItemWithText } from 'src/types/photos'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

export const ParticipantDetails: FC = () => {
  const { id = '' } = useParams()
  const { data: eventInfo } = useGetEventByIdQuery(id ?? '')

  const breakPoint = useBreakPoint()
  const links = [
    {
      id: '1',
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: '26 марта 2023 года',
      info: 'журнал «Прораб Перестройки», стр. 21-24',
    },
    {
      id: '2',
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: '26 марта 2023 года',
      info: 'журнал «Прораб Перестройки», стр. 21-24',
    },
    {
      id: '3',
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: '26 марта 2023 года',
      info: 'журнал «Прораб Перестройки», стр. 21-24',
    },
  ]

  const [allPagePhoto, setAllPagePhoto] = useState<ImageItemWithText[]>([])
  useEffect(() => {
    if (eventInfo) {
      const images: ImageItemWithText[] = []
      if (eventInfo.mainphoto) {
        images.push(eventInfo.mainphoto[0])
      }
      if (eventInfo.photos && Array.isArray(eventInfo.photos)) {
        images.push(...eventInfo.photos)
      }
      setAllPagePhoto(images)
    }
  }, [eventInfo])

  return (
    <div className={styles.participantDetailTab}>
      <h2>Информация</h2>
      <section className={styles.participantInfoSection}>
        <h3>Статусы участника</h3>
        <p>
          Капитан спортивной команды «Кости-моряки», спортсмен, фольклорист, участник ватаги
          «Большие Лбы» (кила)
        </p>
      </section>
      <section className={styles.participantInfoSection}>
        <h3>Официальные регалии</h3>
        <p>
          Кандидат исторических наук, кавалер ордена «12 лет без отпуска», мастер спорта по рыбной
          ловле, заслуженный краевед Тамбовской области, еще какая-то полезная информация о
          достижениях.
        </p>
      </section>
      <section className={styles.participantInfoSection}>
        <h3>Подробнее о себе</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
          Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
          pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci,
          sed rhoncus pronin sapien nunc accuan eget. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
          accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla
          luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan
          eget.
        </p>
      </section>
      <section className={styles.participantInfoSection}>
        <h3>Ссылки</h3>
        <ul className={styles.linksList}>
          {
            links.map((link) => {
              return(
                <li className={styles.linkElem} key={link.id}>
                  <p>{link.title}</p>
                  <span>{link.date + ', ' + link.info}</span>
                </li>
              )
          })
          }
        </ul>
      </section>
    </div>
  )
}
