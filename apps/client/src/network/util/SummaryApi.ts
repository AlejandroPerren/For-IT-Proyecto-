const backendDomain: string = import.meta.env.backendDomain || "http://localhost:8000/api/"

const summaryApi = {
    Users: {
        url: `${backendDomain}users/register`
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




}


export default summaryApi