const Bold3248 = ({ text, ...props }) => (
  <p {...props} className='text-32 leading-10 w-fit h-fit font-Mulish-Bold' >
    {text}
  </p>
)

const Bold2401 = ({ text, ...props }) => (
  <p {...props} className='text-2xl w-fit h-fit font-Mulish-Bold' >
    {text}
  </p>
)

const Bold2024 = ({ text, ...props }) => (
  <p {...props} className='text-xl leading-6 w-fit h-fit font-Mulish-Bold' >
    {text}
  </p>
)

const Bold1827 = ({ text, ...props }) => (
  <p {...props} className='text-lg leading-7 w-fit h-fit font-Mulish-Bold' >
    {text}
  </p>
)

const SemiBold1624 = ({ text, ...props }) => (
  <p {...props} className='text-base leading-6 w-fit h-fit font-Mulish-SemiBold' >
    {text}
  </p>
)

const Regular1624 = ({ text, ...props }) => (
  <p {...props} className='text-base leading-6 w-fit h-fit font-Mulish-Regular' >
    {text}
  </p>
)

const Regular1218 = ({ text, ...props }) => (
  <p {...props} className='text-xs leading-4 w-fit h-fit font-Mulish-Regular' >
    {text}
  </p>
)

export {
  Bold2024,
  Bold2401,
  Bold3248,
  Bold1827,
  Regular1218,
  Regular1624,
  SemiBold1624
}