interface Todo{
    id:number,
    todo:string,
    status: string | 'todo' | 'completed' | 'pending' | 'deleted';
}
export default Todo