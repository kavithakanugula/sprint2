import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/TaskList.css';
import LoggedComponent from './LoggedComponent';
//import { Email } from '@mui/icons-material';

const TeamList = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    teamId: '',
    teamName: '',
    teamLeadName: '',
    teamMembers: []
  });
  const [updatedTeam, setUpdatedTeam] = useState({
    teamId: '',
    teamName: '',
    teamLeadName: '',
    teamMembers: []
  });

  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-teams')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9099/admin/get-all-employee')
      .then(response => {
        console.log(response.data);
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (teamId) => {
    axios.delete(`http://localhost:9099/admin/delete-team/${teamId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.teamId !== teamId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdate = (team) => {
    setIsUpdateFormOpen(true);
    setUpdatedTeam(team);
  };

  const handleAddFormOpen = () => {
    setIsAddFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    
    setIsUpdateFormOpen(false);

    setUpdatedTeam({
      teamId: '',
      teamName: '',
      teamLeadName: '',
      teamMembers: []
    });
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
    setNewTeam({
      teamId: '',
      teamName: '',
      teamLeadName: '',
      teamMembers: []
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log(newTeam);
    axios.post('http://localhost:9099/admin/addteam', newTeam)
      .then(response => {
        setTasks([...tasks, response.data]);
        handleAddFormClose();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:9099/admin/update-team', updatedTeam)
      .then(() => {
        setTasks(tasks.map(task => task.teamId === updatedTeam.teamId ? updatedTeam : task));
        handleUpdateFormClose();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="tasklist-container">
        <LoggedComponent />
        <div className="tasklist-content">
            <h2 className="tasklist-heading">Team List</h2>
            <button className="update-button" onClick={handleAddFormOpen}>Add Team</button>
            {isAddFormOpen && (
                <form className="add-task-form-container" onSubmit={handleAddFormSubmit}>
                    <h3>Add Team</h3>
                    <label htmlFor="teamId">Team ID:</label>
                    <input
                        type="text"
                        id="teamId"
                        name="teamId"
                        value={newTeam.teamId}
                        onChange={(event) =>
                            setNewTeam({
                                ...newTeam,
                                teamId: event.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={newTeam.teamName}
                        onChange={(event) =>
                            setNewTeam({
                                ...newTeam,
                                teamName: event.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="teamLeadName">Team Lead Name:</label>
                    <input
                        type="text"
                        id="teamLeadName"
                        name="teamLeadName"
                        value={newTeam.teamLeadName}
                        onChange={(event) =>
                            setNewTeam({
                                ...newTeam,
                                teamLeadName: event.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="teamMembers">Team Members:</label>
                    <select
                        multiple
                        id="teamMembers"
                        name="teamMembers"
                        value={newTeam.teamMembers}
                        onChange={(event) =>
                            setNewTeam({
                                ...newTeam,
                                teamMembers: Array.from(
                                    event.target.selectedOptions,
                                    (option) => option.value
                                ),
                            })
                        }
                        
                    >
                        {employees.map((employee) => (
                            <option
                                key={employee.employeeId}
                                value={employee.employeeId}
                            >
                                {employee.employeeName}
                            </option>
                        ))}
                    </select>
                    <div className="add-form-buttons">
                        <button type="submit" className='update-button'>Add</button>
                        <button type="button" className='delete-button' onClick={handleAddFormClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
            {isUpdateFormOpen && (
                <form className="add-task-form-container" onSubmit={handleUpdateFormSubmit}>
                    <h3>Update Team</h3>
                    <label htmlFor="teamId">Team ID:</label>
                    <input
                        type="text"
                        id="teamId"
                        name="teamId"
                        value={updatedTeam.teamId}
                        onChange={(event) =>
                            setUpdatedTeam({
                                ...updatedTeam,
                                teamId: event.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={updatedTeam.teamName}
                        onChange={(event) =>
                            setUpdatedTeam({
                                ...updatedTeam,
                                teamName: event.target.value,
                            })
                        }
                        required
                    />
                    <label htmlFor="teamLeadName">Team Lead Name:</label>
                    <input
                        type="text"
                        id="teamLeadName"
                        name="teamLeadName"
                        value={updatedTeam.teamLeadName}
                        onChange={(event) =>
                            setUpdatedTeam({
                                ...updatedTeam,
                                teamLeadName: event.target.value,
                                })
                                }
                                required
                                />
                                <label htmlFor="teamMembers">Team Members:</label>
                                <select
                                multiple
                                id="teamMembers"
                                name="teamMembers"
                                value={updatedTeam.teamMembers}
                                onChange={(event) =>
                                setUpdatedTeam({
                                ...updatedTeam,
                                teamMembers: Array.from(
                                event.target.selectedOptions,
                                (option) => option.value
                                ),
                                })
                                }
                                
                                >
                                {employees.map((employee) => (
                                <option
                                                             key={employee.employeeId}
                                                             value={employee.employeeId}
                                                         >
                                {employee.employeeName}
                                </option>
                                ))}
                                </select>
                                <div className="update-form-buttons">
                                <button type="submit" className='update-button'>Update</button>
                                <button type="button"className='delete-button' onClick={handleUpdateFormClose}>
                                Cancel
                                </button>
                                </div>
                                </form>
                                )}
                                <table className="tasklist-table">
                                <thead>
                                <tr>
                                <th>Team ID</th>
                                <th>Team Name</th>
                                <th>Team Lead Name</th>
                                <th>Action</th>
                                
                                
                                </tr>
                                </thead>
                                <tbody>
                                {tasks.map((team) => (
                                <tr key={team.teamId}>
                                <td>{team.teamId}</td>
                                <td>{team.teamName}</td>
                                <td>{team.teamLeadName}</td>
                                
                                <td>
                                <button
                                className="update-button"
                                onClick={() => handleUpdate(team)}
                                >
                                Edit
                                </button>
                                <button
                                className="delete-button"
                                onClick={() => handleDelete(team.teamId)}
                                >
                                Delete
                                </button>
                                </td>
                                </tr>
                                ))}
                                </tbody>
                                </table>
                                </div>
                                </div>
                                );
                                };
                                
                                export default TeamList;
