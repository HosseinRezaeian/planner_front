

// import { useDisclosure } from '@mantine/hooks';
// import { Modal, ActionIcon, List, TextInput, Checkbox, Stack, Button } from '@mantine/core';
// import { IconCopyPlus } from '@tabler/icons-react';
// import React, { useState } from "react";

// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// // import { useGetTodosQuery, useCreateTodoMutation } from '../features/TodoApi';






// const Todo: React.FC = () => {
//     const [opened, { open, close }] = useDisclosure(false);
//     const { data: todos, error, isLoading } = useGetTodosQuery();
//     const [createTodo] = useCreateTodoMutation();
//     const [taskTitle, setTaskTitle] = useState("");
//     const [Done, setDonetask] = useState(false);

//     const handleAddTodo = () => {
//         if (taskTitle.trim()) {
//             console.log("adddd", taskTitle);
//             createTodo({ title: taskTitle, done: Done });
//             console.log("",)
//             close()
//             setTaskTitle("");
//         }
//     };

//     // const [selectedDate, setSelectedDate] = useState(new Date());

//     // const [date, setDate] = useState(null);
//     return (
//         <>
//             <Modal  opened={opened} onClose={close} size={"xs"} title="Add a task" centered>
//                 <Stack
//                     h={200}
//                     bg="var(--mantine-color-body)"
//                     align="stretch"
//                     justify="center"
//                     gap="md">
                        
//                     <TextInput label="Title" value={taskTitle}
//                         onChange={(e) => setTaskTitle(e.target.value)} placeholder='input a title' />
//                     <Checkbox label="done" checked={Done} onChange={(event) => setDonetask(event.currentTarget.checked)} ></Checkbox>
//                     <DatePicker 

//                         fixMainPosition={true}
//                         calendar={persian}
//                         locale={persian_fa}
//                         calendarPosition={`bottom-center`}
//                     />


//                 </Stack>
//                 <Button onClick={handleAddTodo}>add task</Button>
//             </Modal>

//             <ActionIcon variant="default" color="blue" size="lg" onClick={open} aria-label="Gallery">
//                 <IconCopyPlus size={20} color="blue" stroke={1.5} />
//             </ActionIcon>
//             <List>

//                 {todos?.map((todo) => (<List.Item>

//                     <span>{todo.title}</span>                     
//                     <Checkbox  checked={todo.done} ></Checkbox>

//                 </List.Item>))}

//             </List>


//         </>

//     );
// }
// export default Todo;