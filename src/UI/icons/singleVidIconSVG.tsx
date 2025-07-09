import { FC } from "react"

type SingleVidIconSVGProps = {
  color?: string
}

export const SingleVidIconSVG:FC<SingleVidIconSVGProps> = ({ color = '#D5D5D5' }) => {
  return (
    <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.00046 7.21205C9.6289 7.21205 10.949 5.82143 10.949 4.10602C10.949 2.39061 9.6289 1 8.00046 1C6.37202 1 5.05191 2.39061 5.05191 4.10602C5.05191 5.82143 6.37202 7.21205 8.00046 7.21205Z'
        fill={color}
      />
      <path
        d='M9.76501 9.01145C11.8267 9.01145 13.5 10.7746 13.5 12.9459V13.7316C13.5 14.9837 12.5353 16 11.3466 16H4.65337C3.46473 16 2.5 14.9837 2.5 13.7316V12.9459C2.5 10.7741 4.17376 9.01145 6.23499 9.01145H9.76501Z'
        fill={color}
      />
    </svg>
  )
}
