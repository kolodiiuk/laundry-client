import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useAppSelector } from '../../app/store/configureStore';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    selectedServices: number[];
    onSave: (selectedIds: number[]) => void;
}

export default function ServiceSelectionDialog({ open, onClose, selectedServices, onSave }: Props) {
    const { services } = useAppSelector(state => state.services);
    const [selected, setSelected] = useState<number[]>(selectedServices);

    const handleToggle = (serviceId: number) => {
        setSelected(prev => {
            if (prev.includes(serviceId)) {
                return prev.filter(id => id !== serviceId);
            }
            return [...prev, serviceId];
        });
    };

    const handleSave = () => {
        onSave(selected);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Select Applicable Services</DialogTitle>
            <DialogContent>
                <FormGroup>
                    {services.map((service) => (
                        <FormControlLabel
                            key={service.id}
                            control={
                                <Checkbox
                                    checked={selected.includes(service.id)}
                                    onChange={() => handleToggle(service.id)}
                                />
                            }
                            label={service.name}
                        />
                    ))}
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
