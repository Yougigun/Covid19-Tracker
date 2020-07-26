export const sortData = data =>(
    data.sort((a,b)=> a.cases>b.cases? -1:1)
)