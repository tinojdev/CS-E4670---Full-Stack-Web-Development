export const Notification = ({ message, isError }) => {
  if (message === undefined) {
    return <></>
  }

  return (
    <div className={isError ? "error" : "success"}>
      {message}
    </div>
  )
}