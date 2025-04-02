export const formatDate = (isoString) => {
    const date = new Date(isoString); 
    return date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }) + " at " + date.toLocaleTimeString('en-US', {
      hour: 'numeric', 
      minute: '2-digit',
      hour12: false
    })
}
