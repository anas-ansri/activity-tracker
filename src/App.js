import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://paju3125.github.io/Sample-Json/sample-data.json"
        );
        setData(result.data.data);
      } catch (error) {
        setError("Error fetching the data");
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Stored Data:", data);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data.AuthorWorklog || !data.AuthorWorklog.rows) {
    return <div>No data available</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Activity Tracker
      </Typography>
      {data.AuthorWorklog.rows.map((author) => (
        <Card key={author.name} style={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {author.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Activities
            </Typography>
            <Grid container spacing={2}>
              {author.totalActivity.map((activity) => (
                <Grid item key={activity.name} xs={6} md={4} lg={3}>
                  <Card
                    style={{
                      backgroundColor:
                        data.AuthorWorklog.activityMeta.find(
                          (meta) => meta.label === activity.name
                        )?.fillColor || "#fff",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1">
                        {activity.name}
                      </Typography>
                      <Typography variant="h6">{activity.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="subtitle1" gutterBottom>
              Day-wise Activities
            </Typography>
            {author.dayWiseActivity.map((day) => (
              <div key={day.date}>
                <Typography variant="subtitle2">{day.date}</Typography>
                <List>
                  {day.items.children.map((item) => (
                    <ListItem key={item.label}>
                      <ListItemIcon>
                        <CircleIcon style={{ color: item.fillColor }} />
                      </ListItemIcon>
                      <ListItemText primary={`${item.label}: ${item.count}`} />
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default App;
