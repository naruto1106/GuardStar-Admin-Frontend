import { APIURL } from './contant';
import { toast } from 'react-toastify';
import { setOpeningChecklist } from '../reducer/ChecklistSlice';

export const getOpeninglist = () => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/getOpeningChecklist`,
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
export const getOpeningCheckStatus = () => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/getOpeningCheckStatus`,
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
export const getClosingCheckStatus = () => {
  return async () => {
    try {
      // Make API request to register the user
      const response = await fetch(
        `${APIURL}/checklist/getClosingCheckStatus`,
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

export const getClosinglist = () => {
    return async (dispatch) => {
        try {
        // Make API request to register the user
        const response = await fetch(
            `${APIURL}/checklist/getClosingChecklist`,
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
export const createClosingChecklist = (createData) => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/addClosingCheckItem`,
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
        toast.success('Successfully created opening checklist!');
  
      } catch (error) {
        // Dispatch failure action if there's an error
        toast.error("Failed created opening checklist");
      }
    }
  }
export const updateClosingChecklist = (updateData) => {
    return async (dispatch) => {
      try {
        // Make API request to register the user
        const response = await fetch(
          `${APIURL}/checklist/updateClosingChecklistStatus`,
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
      
      const data = await response.json();
      return data;

    } catch (error) {
      // Dispatch failure action if there's an error
      toast.error("Failed Server connection");
    }
  }
}