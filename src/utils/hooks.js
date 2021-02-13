import { useRef, createContext, useState, useReducer, useCallback } from 'react'
import axios from 'axios'

import { useKeycloak } from '@react-keycloak/web'

export const PropertiesContext = createContext({
    properties: [],
    setProperties: (properties) => {},
    addProperty: (property) => {},
    removeProperty: (property) => {},
})

function reducerProperties(state, action) {
    switch (action.type) {
        case 'SET': {
            const array = action.payload
            return {
                ...state,
                properties: array
            }
        }
        case 'ADD': {
            const array = state.properties
            array.push(action.payload)
            return {
                ...state,
                properties: array
            }
        }
        case 'REM': {
            const array = state.properties.filter(p => p.id !== action.payload.id)
            return {
                ...state,
                properties: array
            }
        }
        default: return state
    }
}

export function PropertiesHook(props) {
    const [state, dispatch] = useReducer(reducerProperties, { properties: [] })

    const setProperties = useCallback((properties) => {
        dispatch({
            type: 'SET',
            payload: properties
        })
    }, [dispatch])

    const addProperty = useCallback((property) => {
        dispatch({
            type: 'ADD',
            payload: property
        })
    }, [dispatch])

    const removeProperty = useCallback((property) => {
        dispatch({
            type: 'REM',
            payload: property
        })
    }, [dispatch])

    return (
        <PropertiesContext.Provider value={{ properties: state.properties, setProperties, addProperty, removeProperty }} {...props} />
    )
}

export function withPropertiesHook(Component) {
    return (props) => (
        <PropertiesHook>
            <Component {...props} />
        </PropertiesHook>
    )
}

export const TaskContext = createContext({
    task: {
        properties: []
    },
    setBoard: (board) => { }
})

export function TaskHook(props) {
    const [task, setTask] = useState({
        task: {
            properties: []
        }
    })

    return (
        <TaskContext.Provider value={{ task: task, setTask }} {...props} />
    )
}

export function withTaskHook(Component) {
    return (props) => (
        <TaskHook>
            <Component {...props} />
        </TaskHook>
    )
}

export const TasksContext = createContext({
    tasks: [],
    setTasks: (tasks) => { },
    addTask: (task) => { },
    removeTask: (task) => { }
})

function reducerTasks(state, action) {
    switch (action.type) {
        case 'SET': {
            const array = action.payload
            return {
                ...state,
                tasks: array
            }
        }
        case 'ADD': {
            const array = state.tasks
            array.push(action.payload)
            return {
                ...state,
                tasks: array
            }
        }
        case 'REM': {
            const array = state.tasks.filter(p => p.id !== action.payload.id)
            return {
                ...state,
                tasks: array
            }
        }
        default: return state
    }
}

export function TasksHook(props) {
    const [state, dispatch] = useReducer(reducerTasks, { tasks: [] })

    const setTasks = useCallback((tasks) => {
        dispatch({
            type: 'SET',
            payload: tasks
        })
    }, [dispatch])

    const addTask = useCallback((task) => {
        dispatch({
            type: 'ADD',
            payload: task
        })
    }, [dispatch])

    const removeTask = useCallback((task) => {
        dispatch({
            type: 'REM',
            payload: task
        })
    }, [dispatch])

    return (
        <TasksContext.Provider value={{ tasks: state.tasks, setTasks, addTask, removeTask }} {...props} />
    )
}

export function withTasksHook(Component) {
    return (props) => (
        <TasksHook>
            <Component {...props} />
        </TasksHook>
    )
}

export const BoardContext = createContext({
    board: {
        tasks: []
    },
    setBoard: (board) => { }
})

export function BoardHook(props) {
    const [board, setBoard] = useState({
        board: {
            tasks: []
        }
    })

    return (
        <BoardContext.Provider value={{ board: board, setBoard }} {...props} />
    )
}

export function withBoardHook(Component) {
    return (props) => (
        <BoardHook>
            <Component {...props} />
        </BoardHook>
    )
}

export const BoardsContext = createContext({
    boards: [],
    setBoards: (boards) => { },
    addBoard: (board) => { },
    removeBoard: (board) => { }
})

function reducerBoards(state, action) {
    switch (action.type) {
        case 'SET': {
            const array = action.payload
            return {
                ...state,
                boards: array
            }
        }
        case 'ADD': {
            const array = state.boards
            array.push(action.payload)
            return {
                ...state,
                boards: array
            }
        }
        case 'REM': {
            const array = state.boards.filter(p => p.id !== action.payload.id)
            return {
                ...state,
                boards: array
            }
        }
        default: return state
    }
}

export function BoardsHook(props) {
    const [state, dispatch] = useReducer(reducerBoards, { boards: [] })

    const setBoards = useCallback((boards) => {
        dispatch({
            type: 'SET',
            payload: boards
        })
    }, [dispatch])

    const addBoard = useCallback((board) => {
        dispatch({
            type: 'ADD',
            payload: board
        })
    }, [dispatch])

    const removeBoard = useCallback((board) => {
        dispatch({
            type: 'REM',
            payload: board
        })
    }, [dispatch])

    return (
        <BoardsContext.Provider value={{ boards: state.boards, setBoards, addBoard, removeBoard }} {...props} />
    )
}

export function withBoardsHook(Component) {
    return (props) => (
        <BoardsHook>
            <Component {...props} />
        </BoardsHook>
    )
}

export const ProjectContext = createContext({
    project: {
        boards: []
    },
    setProject: (project) => { }
})

export function ProjectHook(props) {
    const [project, setProject] = useState({
        project: {
            boards: []
        }
    })

    return (
        <ProjectContext.Provider value={{ project: project, setProject }} {...props} />
    )
}

export function withProjectHook(Component) {
    return (props) => (
        <ProjectHook>
            <Component {...props} />
        </ProjectHook>
    )
}

export const ProjectsContext = createContext({
    projects: [],
    setProjects: (projects) => { },
    addProject: (project) => { },
    removeProject: (project) => { }
})

function reducerProjects(state, action) {
    switch (action.type) {
        case 'SET': {
            const array = action.payload
            return {
                ...state,
                projects: array
            }
        }
        case 'ADD': {
            const array = state.projects
            array.push(action.payload)
            return {
                ...state,
                projects: array
            }
        }
        case 'REM': {
            const array = state.projects.filter(p => p.id === action.payload.id)
            return {
                ...state,
                projects: array
            }
        }
        default: return state
    }
}

export function ProjectsHook(props) {
    const [state, dispatch] = useReducer(reducerProjects, { projects: [] })

    const setProjects = useCallback((projects) => {
        dispatch({
            type: 'SET',
            payload: projects
        })
    }, [dispatch])

    const addProject = useCallback((project) => {
        dispatch({
            type: 'ADD',
            payload: project
        })
    }, [dispatch])

    const removeProject = useCallback((project) => {
        dispatch({
            type: 'REM',
            payload: project
        })
    }, [dispatch])

    return (
        <ProjectsContext.Provider value={{ projects: state.projects, setProjects, addProject, removeProject }} {...props} />
    )
}

export function withProjectsHook(Component) {
    return (props) => (
        <ProjectsHook>
            <Component {...props} />
        </ProjectsHook>
    )
}

export const SessionContext = createContext({
    user: {},
    setUser: (user) => { }
})

export function SessionHook(props) {
    const [user, setUser] = useState({})

    return (
        <SessionContext.Provider value={{ user, setUser }} {...props} />
    )
}

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    function onChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = useCallback((event) => {
        event.preventDefault()
        callback()
    }, [callback])

    return {
        onChange,
        onSubmit,
        setValues,
        values
    }
}

export const useAxios = (config) => {
    const { keycloak, initialized } = useKeycloak()
    const token = keycloak?.token ?? ''
    const instance = useRef(axios.create({
        ...config,
        headers: {
            Authorization: initialized ? `Bearer ${token}` : undefined,
        },
    }))

    return instance.current
}