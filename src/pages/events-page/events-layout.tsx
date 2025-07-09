import { type FC } from 'react'
import { Container } from 'src/UI/Container/Container'
import { BreadCrumbs } from 'src/modules/bread-crumbs/bread-crumbs'
import { Outlet, useLocation } from 'react-router-dom'
import { useGetEventByIdQuery } from 'src/store/events/events.api'

export const EventsLayout: FC = () => {
  const location = useLocation()
  const pathParts = location.pathname.split('/')
  const firstId = pathParts[2]
  const firstIdNumber = parseInt(firstId, 10)
	const { data: eventData } = useGetEventByIdQuery(String(firstIdNumber) ?? '')
  return (
    <>
      <Container>
        <BreadCrumbs
          innerElementCrumbs={location.pathname.includes('/event-program')}
          crumbsLinksMap={[
            {
              title: 'События',
              link: 'events',
            },
            {
              title: eventData?.title ?? '',
              link: `events/${firstIdNumber}`,
            },
          ]}
        />
      </Container>
      <Outlet />
      <Container>
        <BreadCrumbs
          innerElementCrumbs={location.pathname.includes('/event-program')}
          crumbsLinksMap={[
            {
              title: 'События',
              link: 'events',
            },
            {
              title: eventData?.title ?? '',
              link: `events/${firstIdNumber}`,
            },
          ]}
        />
      </Container>
    </>
  )
}

