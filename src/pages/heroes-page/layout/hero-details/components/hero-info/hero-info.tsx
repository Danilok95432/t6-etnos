import styles from './index.module.scss'

export const HeroInfo = () => {
  return (
    <div className={styles.heroInfoWrapper}>
      <h2>Герои</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
        Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
        sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus
        pronin sapien nunc accuan eget.
      </p>
    </div>
  )
}
