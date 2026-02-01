const { protect } = require('../middleware/auth');

// GET /api/members
router.get('/', protect, async (req, res) => {
  try {
    const { status, role, search, page = 1, limit = 20 } = req.query;

    const query = {};

    // Multi-tenancy: Only show members of the user's association if they are an admin
    if (req.user.associationId) {
      query.associationId = req.user.associationId;
    }

    if (status) query.status = status;
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { membershipNumber: new RegExp(search, 'i') },
      ];
    }

    const members = await Member.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Member.countDocuments(query);

    res.json({
      success: true,
      data: members,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/members/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Member.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          totalSpent: { $sum: '$totalSpent' },
        },
      },
    ]);

    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ status: 'Active' });

    res.json({
      stats,
      totalMembers,
      activeMembers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/members/:id
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate('tickets')
      .populate('orders');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/members
router.post('/', async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /api/members/:id
router.patch('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/members/:id
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;