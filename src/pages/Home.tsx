import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../services/userService.js";
import UserForm from "../components/UserForm.js";
import type { User } from "../types/User.js";
import { List, ListItem, ListItemText, Button, Paper, Typography, Box, Snackbar, Alert, Dialog, DialogTitle, 
    DialogContent, DialogActions  } from "@mui/material";
export default function Home() {
    const [userList, setUserList]=useState<User[]>([])
    const[editingUser, setEditingUser]=useState<User | null>(null)
    const [snackbar, setSnackbar] = useState<{
            open: boolean;
            message: string;
            severity: "success" | "error";
            }>({
            open: false,
            message: "",
            severity: "success"
            });
     const [deleteId, setDeleteId] = useState<number | null>(null);
     const showSnackbar = (
        message: string,
        severity: "success" | "error"
        ) => {
        setSnackbar({ open: true, message, severity });
        };



    const fetchUsers=async()=>{
        try {
             const res=await getUsers();
             setUserList(res);
        } catch (error) {
            console.log(error);
            alert("failed to load data");
        }  
    }
    const removeUser= async(id:number)=>{
        try {
             await deleteUser(id);
             fetchUsers();    
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
       fetchUsers();
    }, []);
    return (
        <>
            <Typography variant="h4" gutterBottom align="center">
            User Management
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <UserForm
                onUserCreated={()=>{fetchUsers()
                showSnackbar("User saved successfully!", "success");}}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
            />
            </Box>

            <Paper sx={{ p: 2 }}>
            <List>
                {userList.map(user => (
                <ListItem
                    key={user.id}
                    secondaryAction={
                    <>
                        <Button size="small" onClick={() => setEditingUser(user)}>
                        Edit
                        </Button>
                        <Button
                        size="small"
                        color="error"
                        onClick={() => setDeleteId(user.id!)}>
                        Delete
                        </Button>
                    </>
                    }
                >
                    <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.email} | ${user.phone}`}
                    />
                </ListItem>
                ))}
            </List>
            </Paper>

            <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button
                    color="error"
                    onClick={async () => {
                        if (deleteId !== null) {
                        await removeUser(deleteId);
                        showSnackbar("User deleted successfully!", "success");
                        setDeleteId(null);
                        }
                    }}> 
                    Delete 
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}