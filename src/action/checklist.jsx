import { APIURL } from './contant';
import { toast } from 'react-toastify';
import { setOpeningChecklist } from '../reducer/ChecklistSlice';

export const getSensorData = (userId) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/sensor/getSensorData?userId=${userId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          
        }
      );
     
      if (!response.ok) {
        throw new Error('Failed to categories');
      }
      const data = await response.json();
      // console.log(data, 'cron data');
      return data;
    } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
    }
  }
}
export const getSensorDetail = (id) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/sensor/getSensorDetail?id=${id}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          
        }
      );
     
      if (!response.ok) {
        throw new Error('Failed to get Sensor');
      }
      const data = await response.json();
      // console.log(data, 'cron data');
      return data;
    } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
    }
  }
}

export const updateSensor = (updateData) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/sensor/updateSensor`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      const data = await response.json();
      // Dispatch success action if the request is successful
      // toast.success('Successfully updated!');
      return data;

    } catch (error) {
      // Dispatch failure action if there's an error
      toast.error("Failed updated.");
    }
  }
}

export const getOpeninglist = (userId) => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/getOpeningChecklist?userId=${userId}`,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
            
          }
        );
       
        if (!response.ok) {
          throw new Error('Failed to categories');
        }
        const data = await response.json();
        dispatch(setOpeningChecklist({ openingchecklist: data }))
      } catch (error) {
        // Dispatch failure action if there's an error
        console.log(error, 'error');
      }
    }
}
export const getOpeningCheckStatus = (userId) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/getOpeningCheckStatus?userId=${userId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
     
      if (!response.ok) {
        throw new Error('Failed to categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
    }
  }
}
export const getEditChecklist = (id) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/getEditChecklist?id=${id}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
     
      if (!response.ok) {
        throw new Error('Failed to categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
    }
  }
}
export const getClosingCheckStatus = (userId) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/getClosingCheckStatus?userId=${userId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
     
      if (!response.ok) {
        throw new Error('Failed to categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
    }
  }
}

  
export const createChecklist = (createData) => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/addChecklist`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(createData)
          }
        );
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const data = await response.json();
        // Dispatch success action if the request is successful
        toast.success('Successfully created  checklist!');
        return data;
  
      } catch (error) {
        // Dispatch failure action if there's an error
        toast.error("Failed created  checklist");
      }
    }
}

export const updateChecklist = (updateData) => {
  return async (dispatch) => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/updateChecklist`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      const data = await response.json();
      // Dispatch success action if the request is successful
      toast.success('Successfully created  checklist!');
      return data;

    } catch (error) {
      // Dispatch failure action if there's an error
      toast.error("Failed created  checklist");
    }
  }
}

export const updateChecklistStatus = (updateData) => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/updateChecklistStatus`,
          {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
          }
        );
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const data = await response.json();
        // Dispatch success action if the request is successful
  
      } catch (error) {
        // Dispatch failure action if there's an error
        toast.error("Failed created opening checklist");
      }
    }
  }

export const getClosinglist = (userId) => {
    return async (dispatch) => {
        try {
        // Make API request to register the user
        const response = await fetch(
            `${APIURL}/checklist/getClosingChecklist?userId=${userId}`,
            {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to categories');
        }
        const data = await response.json();
        dispatch(setOpeningChecklist({ closingchecklist: data }))
        } catch (error) {
        // Dispatch failure action if there's an error
        console.log(error, 'error');
        }
    }
}
export const getDownload = (Data) => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/app/download`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data)
        }
      );
      
      const data = await response.blob();
      return data;

    } catch (error) {
      // Dispatch failure action if there's an error
      toast.error("Failed Server connection");
    }
  }
}

export const getSettingData = (userId) => {
  return async () => {
      try {
      // Make API request to register the user
      const response = await fetch(
          `${APIURL}/app/getSetting?userId=${userId}`,
          {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
          },
          }
      );

      if (!response.ok) {
          throw new Error('connect error');
      }
      const data = await response.json();
      return data;
      } catch (error) {
      // Dispatch failure action if there's an error
      console.log(error, 'error');
      }
  }
}
export const updateSetting = (updateData) => {
  return async (dispatch) => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/app/updateSetting`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update setting');
      }
      const data = await response.json();
      // Dispatch success action if the request is successful
      toast.success('Successfully updated!');
      return data;

    } catch (error) {
      // Dispatch failure action if there's an error
      toast.error("Failed update setting.");
    }
  }
}
// export const createClosingChecklist = (createData) => {
//     return async (dispatch) => {
//       try {
//         // Make API request to register the user
//         const response = await fetch(
//           `${APIURL}/checklist/addClosingCheckItem`,
//           {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(createData)
//           }
//         );
//         if (!response.ok) {
//           throw new Error('Failed to register');
//         }
//         const data = await response.json();
//         // Dispatch success action if the request is successful
//         toast.success('Successfully created opening checklist!');
  
//       } catch (error) {
//         // Dispatch failure action if there's an error
//         toast.error("Failed created opening checklist");
//       }
//     }
//   }
// export const updateClosingChecklist = (updateData) => {
//     return async (dispatch) => {
//       try {
//         // Make API request to register the user
//         const response = await fetch(
//           `${APIURL}/checklist/updateClosingChecklistStatus`,
//           {
//             method: "PUT",
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updateData)
//           }
//         );
//         if (!response.ok) {
//           throw new Error('Failed to register');
//         }
//         const data = await response.json();
//         // Dispatch success action if the request is successful
  
//       } catch (error) {
//         // Dispatch failure action if there's an error
//         toast.error("Failed created opening checklist");
//       }
//     }
//   }

    
