import express from 'express';

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        const dashboards: never[] = [];
        res.send(dashboards)
      },
  );

  export default router;
