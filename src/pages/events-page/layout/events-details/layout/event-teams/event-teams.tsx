import { useState, type FC } from 'react'

import { GridRow } from 'src/components/grid-row/grid-row'
import { useBreakPoint } from 'src/hooks/useBreakPoint/useBreakPoint'

import styles from './index.module.scss'
import { FilterPanel } from './components/filter-panel/filterPanel'
import { ParticipantCard } from 'src/components/participant-card/participant-card'
import { TeamCard } from 'src/components/team-card/team-card'

export const EventTeams: FC = () => {
  const mockTeams = [
    {
      id: '1',
      logo: [
        {
          id: '1',
          author: '',
          title: '',
          original: '',
          thumbnail: '',
        },
      ],
			name: 'Название группы участников 1',
      region: 'Татарстан, республика (16)',
      participants: [
        {
          id: '1',
          photo: [
            {
              id: '1',
              original: '',
              thumbnail: '',
              author: '',
              title: '',
            },
          ],
          name: 'Даниил «Гусь» Гусев',
          region: 'Татарстан, республика (16)',
          age: '30',
          group: 'Название группы участников',
          type: ['Спортсмен'],
          registration: '2025-06-01T14:30:00+03:00',
        },
        {
          id: '2',
          photo: [
            {
              id: '2',
              original: '',
              thumbnail: '',
              author: '',
              title: '',
            },
          ],
          name: 'Роман «Зельда» Романов',
          region: 'Татарстан, республика (16)',
          age: '25',
          group: 'Название группы участников',
          type: ['Спортсмен'],
          registration: '2025-06-01T14:30:00+03:00',
        },
      ],
			type: 'Фольклористы',
			registration: '2025-06-01T14:30:00+03:00',
    },
  ]

  const breakpoint = useBreakPoint()

  const [searchName, setSearchName] = useState<string>('')
  const [searchRegion, setSearchRegion] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('0')
  const [view, setView] = useState<string>('list')

  const options = {
    name: searchName,
    setSearchName: setSearchName,
    region: searchRegion,
    setSearchRegion: setSearchRegion,
    type: searchType,
    setSearchType: setSearchType,
    view: view,
    setView: setView,
  }

  return (
    <div className={styles.teamsSection}>
      <h4>Ватаги и коллективы</h4>
      <div className={styles.headTeams}>
        <FilterPanel options={options} />
      </div>
      <GridRow
        $template={
          breakpoint === 'S'
            ? 'auto / repeat(auto-fit, minmax(300px, 300px))'
            : 'auto / repeat(auto-fit, minmax(245px, 245px))'
        }
        $gap='20px'
        $margin='0 0 30px 0'
      >
        {mockTeams?.map((teamEl) => <TeamCard key={teamEl.id} {...teamEl} />)}
      </GridRow>
    </div>
  )
}

