const classNames = (...classes: any[]) =>  
  classes.reduce((prev, v) => {
    if (!v) return prev
    if (!prev) return v
    return `${prev} ${v}`
  }, '')

export {
  classNames
}