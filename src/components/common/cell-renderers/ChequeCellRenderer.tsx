import { Button } from "@mui/material";

interface Props {
    data: number;
}

export default function ChequeCellRenderer({data} : Props) {

    const handleGetCheque = () => {
        
    }
    return (
        <Button
        sx={{
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          border: 'none'
        }}
        onClick={handleGetCheque}
      >
        +
      </Button>
    )
}