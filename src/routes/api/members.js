const express = require('express');
const router = express.Router();

const members = require('../../members')

// Gets all members
router.get('/', (request, response) => response.json(members));

// Get single member
router.get('/:id', (request, response) => {
  const id = request.params.id;
  const member = members.find(member => member.id === parseInt(id));
  if (!member) response.status(400).json({ msg: `No member with the id of ${id}` });
  response.json(member);
});

// Create member
router.post('/', (request, response) => {
  const { name, email } = request.body;

  if (!name || !email) {
    return response.status(400).json({ msg: 'Missing name or email.' });
  }

  createMember(name, email);

  response.json(members);
  // response.redirect('/');
})

// Update Member
router.put('/:id', (request, response) => {
  const id = request.params.id;
  const found = members.some(member => member.id === parseInt(id))

  if (!found) return response.status(400).json({ msg: 'Member not found.' })

  const newMember = request.body;

  members.forEach(member => {
    if (member.id === parseInt(id)) {
      member.name = member.name !== newMember.name ? member.name : newMember.name;
      member.email = member.email === newMember.email ? member.email : newMember.email;

      response.json({ msg: 'Member updated', member })
    }
  })
})

// Delete Member
router.delete('/:id', (request, response) => {
  const id = request.params.id;
  
  const found = members.some(member => member.id === parseInt(id));
  
  if (!found) {
    return response.status(400).json({ msg: `No member with the id of ${id}` })
  }

  response.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(id)) })
})
function createMember(name, email) {

  const newMember = {
    name,
    email,
    id: members.length + 1
  }

  members.push(newMember);

  return newMember
}

module.exports = router;