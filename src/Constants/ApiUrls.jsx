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

// Admin Routes - Jobs
export const fetchAllJobsAdmin = async (searchValue = '') => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/jobs?search=${encodeURIComponent(searchValue)}`, {
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

export const postJobAdmin = async (jobData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/upload-job`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(jobData)
        });

        if(response.status === 201) {
            const data = await response.json()
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteJobAdmin = async (jobId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/delete-job?jobId=${jobId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if(response.status == 200) {
            const data = await response.json()
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateJobAdmin = async (jobId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/update-job/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if(response.status == 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

// Admin Routes - users
export const fetchAllusersAdmin = async (searchValue = '') => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/users?search=${encodeURIComponent(searchValue)}`, {
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

export const deleteUserAdmin = async (userId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/delete-user?userId=${encodeURIComponent(userId)}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if(response.status == 200) {
            const data = await response.json()
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateUserAdmin = async (userId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/update-user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if(response.status == 200){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error)
    }
}

// Admin Routes - webscraping
export const webScrapingUrlAdmin = async(url) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/web-scraping?jobUrl=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if(response.status === 200) {
            const data = await response.json()
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}