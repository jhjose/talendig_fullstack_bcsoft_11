// General Components with Material UI
import React, {useState} from 'react';
import {Button, Card, Box, Chip, Stack, Divider, Typography, 
    List, ListItem, ListItemText, Accordion, AccordionActions, AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, PieChart } from '@mui/x-charts';
import { useEffect } from 'react';

const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
}

const dataToSend = [
    {title: 'Accordion 1', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
    {title: 'Accordion 2', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
    {title: 'Accordion 3', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
        'Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'},
];

export default function GeneralMaterial(){

    const [data, setData] = useState([]);

    useEffect(()=>{
        console.log(dataToSend)
        setData(dataToSend);
    }, [])

    return <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <div style={{margin: 20}}>
            <Button variant="text" style={{margin: 5}}>Text</Button>
            <Button variant="contained" style={{margin: 5}}>Hello world</Button>
            <Button variant="outlined" style={{margin: 5}}>Hello world</Button>
            <Button variant="contained" disabled style={{margin: 5}}>Hello world</Button>
            <Button variant="contained" color="success" style={{margin: 5}}>Hello world</Button>
            <Button variant="contained" color="error" style={{margin: 5}}>Hello world</Button>
        </div>
        <Card variant="outlined" style={{margin: 20, maxWidth: 360}}>
            <Box sx={{p: 2}}>
                <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h5" component="div">
                        Toothbrush
                    </Typography>
                    <Typography variant="h6" component="div">
                        $4.50
                    </Typography>
                </Stack>
            </Box>
            <Divider component="div" />
            <Box sx={{p: 2}}>
                <Typography variant="body2">
                    Select Type
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="Soft" size="small"/>
                    <Chip label="Medium" size="small"/>
                    <Chip label="Hard" size="small"/>
                </Stack>
            </Box>
        </Card>
        <div style={{margin: 20}}>
            <List sx={style}>
                <ListItem>
                    <ListItemText primary="Full width variant below" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="El planeta es plano como dicen algunos" />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Pero el planeta según la ciencia el redondo" />
                </ListItem>
            </List>
            <div style={{margin: 20}}>
                {
                    data.map((element, index)=>{
                        console.log('element', element)
                        return <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} 
                                aria-controls="panel1-content" id="panel1-header">
                                <Typography component='span'>{element.title}</Typography>                           
                            </AccordionSummary>
                            <AccordionDetails>
                                {element.details}
                            </AccordionDetails>
                        </Accordion>
                    })
                }
            </div>
        </div>
        <div style={{marginTop: 30}}>
            <BarChart
                series={[
                    {data: [35,44,24,34]},
                    {data: [51,6,49,30]},
                    {data: [15,25,30,50]},
                ]}
                height={290} width={700}
                xAxis={[{data: ['1990', '2000', '2010', '2020'], scaleType: 'band'}]}
                margin={{top: 10, bottom: 30, left: 40, right: 10}}
            />

            <PieChart 
                series={[
                    {
                        data: [
                            {id: 0, value: 15, label: 'Niños'},
                            {id: 1, value: 25, label: 'Adolescentes'},
                            {id: 2, value: 13, label: 'Adultos'},
                            {id: 3, value: 19, label: 'Tercera Edad'},
                        ]
                    }
                ]}
                width={700} height={290}
            />
        </div>
    </div>
}