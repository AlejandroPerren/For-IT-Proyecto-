const backendDomain: string = import.meta.env.backendDomain || "http://localhost:4000/api/"

const summaryApi = {
    Users: {
        url: `${backendDomain}users/`
    },
    Courses: {
        url: `${backendDomain}course/`,
    },
    Quiz: {
        url: `${backendDomain}quiz/`,
    },
    Enrollment: {
        url: `${backendDomain}enrollment/`,
    },
    Section: {
        url: `${backendDomain}section/`,
    },
    Lesson: {
        url: `${backendDomain}lesson/`,
    },
}


export default summaryApi