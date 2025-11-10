import { useEffect, useState } from 'react'
import fetchCompanies from './APIFetchingData';
import FilteredCompanies from './FilteredCompanies';
import { Pagination, Stack } from '@mui/material';

function Home({ onSortChange }) {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [industry, setIndustry] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchCompanies();
            if (response.success) {
                setCompanies(response.data);
                setFiltered(response.data);
            } else {
                setError(response.message);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        let data = companies;
        if (searchQuery) {
            data = data.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (location) {
            data = data.filter((c) => c.location === location);
        }
        if (industry) {
            data = data.filter((c) => c.industry === industry);
        }
        if (onSortChange === "asc") {
            data = [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (onSortChange === "desc") {
            data = [...data].sort((a, b) => b.name.localeCompare(a.name));
        }
        setFiltered(data);
        setPage(1);
    }, [searchQuery, location, industry, companies, onSortChange]);

    const handleSearchChange = (value) => setSearchQuery(value);
    const handleLocationChange = (value) => setLocation(value);
    const handleIndustryChange = (value) => setIndustry(value);

    const handleReset = () => {
        setSearchQuery("");
        setLocation("");
        setIndustry("");
        setFiltered(companies);
        setPage(1);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            {error ? <p className="text-red-600 text-3xl">Error: {error}</p> : ""}
            {loading ? (<p className='text-center text-3xl'>Loading companies details...</p>) :
                (<div className="max-w-6xl mx-auto min-h-[80vh] flex flex-col">
                    <div className="grow">
                        <FilteredCompanies onSearchChange={handleSearchChange} onLocationChange={handleLocationChange} onIndustryChange={handleIndustryChange} onReset={handleReset} />
                        {filtered.length === 0 ? (
                            <div className="text-center text-gray-500 py-20 text-lg font-medium">
                                ❌ No companies found matching your filters.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedData.map(company => (
                                        <div key={company.id} className="p-6 border rounded-2xl shadow-sm bg-white hover:shadow-md transition transform hover:-translate-y-1">
                                            <h2 className="text-xl font-semibold mb-1 text-gray-800">{company.name}</h2>
                                            <p className="text-sm text-gray-600 mb-1"><strong>Industry:</strong> {company.industry}</p>
                                            <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {company.location}</p>
                                            <p className="text-sm text-gray-600 mb-3"><strong>Employees:</strong> {company.employees}</p>
                                            <a href={company.website} target="_blank" className="text-blue-600 hover:underline text-sm font-medium">Visit Website →</a>
                                        </div>
                                    ))}

                                </div>
                            </>)}
                    </div>
                    <Stack spacing={2} alignItems="center" className="mt-10 mb-6">
                        <Pagination
                            count={Math.ceil(filtered.length / itemsPerPage)}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                            size="large"
                            siblingCount={0}
                            boundaryCount={1}
                            showFirstButton
                            showLastButton
                            hidden={filtered.length === 0}
                        />
                    </Stack>
                </div>)
            }
        </>
    )
}

export default Home