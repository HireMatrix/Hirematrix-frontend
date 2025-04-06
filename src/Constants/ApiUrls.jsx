// To get all jobs
export const fetchAllJobs = async (filters) => {
    
    const queryParams = new URLSearchParams(filters);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/jobs?${queryParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

// Admin Routes
export const fetchAllJobsAdmin = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/jobs`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllusersAdmin = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}