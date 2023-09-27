interface Todo{
    id:number,
    todo:string,
    status: string | 'todo' | 'completed' | 'pending' | 'deleted',
   update:boolean
}
export default Todo