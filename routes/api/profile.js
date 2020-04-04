const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const gravatar = require('gravatar');

const validateProfileInput=require('../../validation/profile');
const validatePatientInput = require('../../validation/patient');
const validateAppointmentInput=require('../../validation/appointment');
//Load Profile model
const Profile=require('../../models/Profile');
//Load User model
const User=require('../../models/User');

// -----------------Get test profile--------------------//
// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


//---------------Get Current User------------------------//
//@route GET api/profile
//@desc GET current users profile
//@access Private
router.get('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
  try {
      const errors={};
      
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate('users', ['firstname', 'lastname', 'address', 'phone',]);
  
      if (!profile) {
        errors.noprofile='There is no profile for this user';
        return res.status(400).json(errors);
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

//@route POST api/profile
//@desc CREATE users profile
//@access Private
router.post('/',passport.authenticate('jwt',{session:false}),async (req,res)=>{
  const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.firstname) profileFields.firstname=req.body.firstname;
    if (req.body.lastname) profileFields.lastname=req.body.lastname;
    if (req.body.gender) profileFields.gender=req.body.gender;
    if (req.body.phone) profileFields.phone=req.body.phone;
    if (req.body.birthdate) profileFields.birthdate=req.body.birthdate
    
    //Adresse
    profileFields.address = {};
    if (req.body.region) profileFields.address.region = req.body.region
    if (req.body.Country) profileFields.address.Country = req.body.Country;
    if (req.body.State) profileFields.address.State = req.body.State;
    if (req.body.ZipCode) profileFields.address.ZipCode = req.body.ZipCode;
    
    
   
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
});


// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// -----------------------------Begin CRUD Patient----------------------//
// @route   POST api/profile/patient
// @desc    Add patient to profile
// @access  Private
router.post(
  '/patient',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePatientInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
      const newPat = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        adresse: req.body.adresse,
        gender:req.body.gender,
        phone:req.body.phone,
        zipcode:req.body.zipcode,
        state:req.body.state,
        country:req.body.country,
        Datebirth:req.body.Datebirth,
        avatar 
       
      };

      // Add to exp array
      profile.patient.unshift(newPat);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/patient/:exp_id
// @desc    Delete patient from profile
// @access  Private
router.delete(
  '/patient/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.patient
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.patient.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/patient/:patient_id
// @desc    Get patient from doctor by id
// @access  Private
router.get(
    '/patient/:patient_id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
  try {
    const foundPatient = await Profile.findOne({ user: req.user.id });

    const myPatient = foundPatient.patient.filter(
      patient => patient._id.toString() === req.params.patient_id
    )[0];
    res.json(myPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   UPDATE api/profile/patient/update/:exp_id
// @desc    Update patient from profile
// @access  Private
router.post(
  '/patient/update/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user= req.user.id;
        
    // Patient
    profileFields.patient = {};
    if (req.body.firstnamepatient) profileFields.patient.firstname = req.body.firstnamepatient;
    if (req.body.lastnamepatient) profileFields.patient.lastname = req.body.lastnamepatient;
    if (req.body.emailpatient) profileFields.patient.email = req.body.emailpatient;
    if (req.body.adressepatient) profileFields.patient.adresse = req.body.adressepatient;
    if (req.body.zipcodepatient) profileFields.patient.zipcode = req.body.zipcodepatient;
    if (req.body.statepatient) profileFields.patient.state = req.body.statepatient;
    if (req.body.countrypatient) profileFields.patient.country = req.body.countrypatient;
    if (req.body.genderpatient) profileFields.patient.gender = req.body.genderpatient;
    if (req.body.phonepatient) profileFields.patient.phone = req.body.phonepatient;
    if (req.body.Datebirthpatient) profileFields.patient.Datebirth = req.body.Datebirthpatient;
    
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    ).then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  }
);

 // -----------------------------END CRUD Patient----------------------//

//-----------------------------BEGIN CRUD Appointment----------------//
// @route   POST api/profile/appointment
// @desc    Add appointment to profile
// @access  Private
router.post(
  '/appointment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAppointmentInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newRendezvous = {
              libelle: req.body.libelle,
              Message: req.body.Message,
              statusAppointment: req.body.statusAppointment,
              typeVisite: req.body.typeVisite,
              NbreVisiteEffectuer: req.body.NbreVisiteEffectuer,
              
            };

      // Add to exp array
      profile.rendezvous.unshift(newRendezvous);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/appointment/:exp_id
// @desc    Delete appointment from profile
// @access  Private
router.delete(
  '/appointment/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.rendezvous
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.rendezvous.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   UPDATE api/profile/appointment/update/:exp_id
// @desc    Update apointment from profile
// @access  Private

router.post(
  '/appointment/update/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user= req.user.id;
        
    // Patient
    profileFields.patient = {};
    if (req.body.libelle) profileFields.patient.libelle = req.body.libelle;
    if (req.body.date) profileFields.patient.date = req.body.date;
    if (req.body.time) profileFields.patient.time = req.body.time;
    if (req.body.Message) profileFields.patient.Message = req.body.Message;
    if (req.body.statusAppointment) profileFields.patient.statusAppointment = req.body.statusAppointment;
    if (req.body.typeVisite) profileFields.patient.typeVisite = req.body.typeVisite;
    if (req.body.NbreVisiteEffectuer) profileFields.patient.NbreVisiteEffectuer = req.body.NbreVisiteEffectuer;
   
    
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    ).then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  }
);
//-----------------------------END CRUD Appointment----------------//
module.exports=router;