// To get all jobs
export const fetchAllJobs = async (filters) => {
    
    const queryParams = new URLSearchParams(filters);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs?${queryParams}`, {
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