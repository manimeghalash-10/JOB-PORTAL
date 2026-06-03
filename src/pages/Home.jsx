import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {

  const navigate = useNavigate()

  // JOB STATE
  const [jobs, setJobs] = useState([])

  // SEARCH STATES
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  // FILTER STATES
  const [selectedType, setSelectedType] =
    useState('')

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState('')

  // LOAD JOBS
  useEffect(() => {

    const adminJobs =
      JSON.parse(localStorage.getItem('jobs')) || []

    // FORMAT JOBS
    const formattedAdminJobs = adminJobs.map(
      (job, index) => ({
        id: index + 1,
        company: job.company || '',
        title: job.position || '',
        type: job.type || '',
        location: job.location || '',
        salary: job.salary || '',
        experience: job.experience || '',
        mode: job.mode || '',
        skills: job.skills || '',
      })
    )

    setJobs(formattedAdminJobs)

  }, [])

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) => {

    // SEARCH TEXT
    const searchText = search.toLowerCase()

    // SEARCH BY TITLE + TYPE + COMPANY + LOCATION + SKILLS
    const matchesSearch =

      job.title
        .toLowerCase()
        .includes(searchText)

      ||

      job.type
        .toLowerCase()
        .includes(searchText)

      ||

      job.company
        .toLowerCase()
        .includes(searchText)

      ||

      job.location
        .toLowerCase()
        .includes(searchText)

      ||

      job.skills
        .toLowerCase()
        .includes(searchText)

    // LOCATION INPUT FILTER
    const matchesLocation =

      location === ''
        ? true
        : job.location
            .toLowerCase()
            .includes(location.toLowerCase())

    // FILTER BY TYPE
    const matchesType =

      selectedType === ''
        ? true
        : job.type === selectedType

    // FILTER BY LOCATION
    const matchesFilterLocation =

      selectedLocation === ''
        ? true
        : job.location === selectedLocation

    return (

      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesFilterLocation

    )

  })

  // HANDLE APPLY
  const handleApply = () => {

    // GO TO REGISTER PAGE
    navigate('/register')

  }

  return (

    <div>

      <Navbar />

      {/* HERO SECTION */}
      <div className='hero'>

        <h1>Find Your Dream Job</h1>

        <div className='search-bar'>

          {/* SEARCH INPUT */}
          <input
            type='text'
            placeholder='Search jobs, company, type, skills...'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {/* LOCATION INPUT */}
          <input
            type='text'
            placeholder='Location...'
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />

          <button>
            Search
          </button>

        </div>

      </div>

      {/* MAIN SECTION */}
      <div className='main-layout'>

        <div className='jobs-grid'>

          {filteredJobs.length > 0 ? (

            filteredJobs.map((job) => (

              <div
                key={job.id}
                className='job-card'
              >

                {/* JOB CARD */}
                <div
                  style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow:
                      '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >

                  <h2>{job.title}</h2>

                  <p>
                    <strong>Company:</strong>{' '}
                    {job.company}
                  </p>

                  <p>
                    <strong>Location:</strong>{' '}
                    {job.location}
                  </p>

                  <p>
                    <strong>Type:</strong>{' '}
                    {job.type}
                  </p>

                  <p>
                    <strong>Salary:</strong>{' '}
                    {job.salary}
                  </p>

                  <p>
                    <strong>Experience:</strong>{' '}
                    {job.experience}
                  </p>

                  <p>
                    <strong>Mode:</strong>{' '}
                    {job.mode}
                  </p>

                  <p>
                    <strong>Skills:</strong>{' '}
                    {job.skills}
                  </p>

                  {/* APPLY BUTTON */}
                  <button
                    onClick={handleApply}
                    style={{
                      marginTop: '15px',
                      width: '100%',
                      padding: '12px',
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '600',
                    }}
                  >
                    Apply Now
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className='no-jobs'>

              <h2>No Jobs Found</h2>

              <p>
                Try changing filters or search.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  )
}

export default Home