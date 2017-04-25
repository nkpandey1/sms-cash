import React from 'react'
import ReactDOM from 'react-dom'
import Dialog from 'material-ui/Dialog'
import axios from 'axios'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { getTeacher, changeDetails, deleteTeacher, approveDetails } from '../../actions/teacherActions.js'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import { connect } from 'react-redux'
var moment = require('moment')

class AllTeacher extends React.Component{
    constructor(props) {
    	super(props);
    	this.props = props
    	this.state = {
    		openTeacherDialog: false,
        allDepartments: [{
          name: "CSE"
        },
        {
          name: "MECH"
        }],
    		allTeacherList: [{
    			name: "Mr Adam",
    			designation: "Assistant Professor",
          department: "CSE",
          adminApproved: true
    		},
        {
          name: "Mr Mukherjee",
    			designation: "Assistant Professor",
          department: "MECH",
          adminApproved: false
        }],
        departmentSelected: [],
        editButtonHit: false
       	}
    }

    handleTouchTap = (type, item, event) => {
      switch(type){
        case "openEditDialog":
          this.setState({
            editButtonHit: true
          })
          break
        case "closeDialog":
          this.setState({
            editButtonHit: false
          })
          break
        case "saveDetails":
          this.setState({
            editButtonHit: false
          })
          let details = {
            name: this.state.teacherName,
            department: this.state.departmentSelected,
            email: this.state.email,
            joinDate: this.state.joinDate,
            designation: this.state.designation
          }
          this.props.changeDetails(details)
          break
        case "getName":
          this.setState({
            teacherName: event.target.value
          })
          break
        case "getDesignation":
          this.setState({
            designation: event.target.value
          })
          break
        case "getEmail":
          this.setState({
            email: event.target.value
          })
          break
        case "deleteTeacher":
          this.props.deleteTeacher(1)
          break
        case "approveDetails": (item) => (event) =>
          {
            let teacher = {
              teacherId: item
            }
            console.log(item)
            this.props.approveDetails(teacher)
          }
          break
        default:
          break
      }
    }
    getDate = (event, date) => {
      this.setState({
        joinDate: date
      })
    }
    handleChangeDepartment = (event, index, value) => {
      this.setState({
        departmentSelected: value
      })
    }

    componentWillUnmount() {

    }

    componentWillGetProps(nextProps){
      this.props = nextProps
    }

    teacherList = (data,index,style) => {
      return(
        <Card key={index}>
          <CardHeader
            title={data.teacher_name}
            subtitle={data.designation}
            avatar="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7LBEv8FJQGibN96zw-vWvm1M-9I3tTgomzbV8NzTQCxu1aCk8Rw4cmBo"
            actAsExpander={true}
          />
          {
            data.approved==false?
            <FlatButton key={index} label="APPROVE DETAILS"
              primary={true}
              style={{mergin: 12, marginLeft: '75%'}}
              onTouchTap={this.handleTouchTap.bind(this, "approveDetails", data.id)}/>
            :null
          }

          <CardText expandable={true}>
                <Table
               height={this.state.height}
               fixedHeader={this.state.fixedHeader}
               fixedFooter={this.state.fixedFooter}
               >
                <TableHeader displaySelectAll= {false}>
                   <TableRow>
                     <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                       Teacher Details
                     </TableHeaderColumn>
                   </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox= {false}>
                   <TableRow key={index}>
                     <TableRowColumn>Joine Date</TableRowColumn>
                     <TableRowColumn colSpan="3">{moment(data.joining_date).format("MMM Do YY")}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn>Experience (In years)</TableRowColumn>
                     <TableRowColumn colSpan="3">{data.experience_years}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn>Email ID</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.teacher_email}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn>Phone number</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.contact_number}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn>Email ID</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.alternate_number}</TableRowColumn>
                   </TableRow>
                   <TableRow>
                     <TableRowColumn>Experience Description</TableRowColumn>
                     <TableRowColumn colSpan="3" >{data.experience_description}</TableRowColumn>
                   </TableRow>
                </TableBody>
              </Table>
              <br/><br/>
              <FlatButton key={index}  label="EDIT" primary={true} style={style} onTouchTap={this.handleTouchTap.bind(event, "openEditDialog")}/>
              <Dialog
              modal={true}
              open={this.state.editButtonHit}
              onRequestClose={this.handleTouchTap.bind(event,"closeDialog")}
              >
                  <form>
                      <TextField
                      floatingLabelText="Teacher name"
                      onChange={ this.handleTouchTap.bind(this, "getName") }
                      />
                      <br />
                      <TextField
                      floatingLabelText="Teacher designation"
                      onChange={this.handleTouchTap.bind(this, "getDesignation")}
                      />
                      <br />
                      <TextField
                      floatingLabelText="Teacher Email ID"
                      onChange={this.handleTouchTap.bind(this, "getEmail")}
                      />
                      <br /><br />
                      <DatePicker key={index} hintText="Join Date" mode="landscape" onChange={ this.getDate }/>
                  </form>
                <RaisedButton key={index} label="SAVE"  style={style} onTouchTap={this.handleTouchTap.bind(event, "saveDetails")}/>
              </Dialog>

            <FlatButton  label="DELETE" secondary={true} style={style} onTouchTap={this.handleTouchTap.bind(event, "deleteTeacher")}/>
          </CardText>
          </Card>
      )
    }


    render(){
      const style = {
        margin: 12
      }
    	return(
    		<div id="divTeacherMain">
          <SelectField
          floatingLabelText="Department"
          value={this.state.departmentSelected}
          onChange={this.handleChangeDepartment}
          multiple={true}
          >
          {
            this.props.subjectReducer.error===false?
            (this.props.subjectReducer.department.map((data, index)=>{
              return(
                <MenuItem key={data.id} value={data.name} primaryText={data.name} />
              )
           })) : null
          }
          </SelectField>
    			{
            this.props.teacherReducer.status == 200 && this.props.teacherReducer.error === false?
    				this.props.teacherReducer.allTeacher.map((data,index)=>{
                if(this.state.departmentSelected.length==0){
                  return this.teacherList(data,data.id,style)
                }
                else{
                  for(let index=0; index <this.state.departmentSelected.length; index++)
                  {
                    if(data.department_name==this.state.departmentSelected[index]){
                      return this.teacherList(data,data.id,style)
                    }
                  }
                }
    				}) : null
    			}
    		</div>
    	)
    }
}


const mapStateToProps = (state) => {
  return {
    teacherReducer: state.teacherReducer,
    subjectReducer: state.subjectReducer,
    headerReducer: state.headerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeacher: () => {
      dispatch(getTeacher())
    },
    changeDetails: (details) => {
      dispatch(changeDetails(details))
    },
    deleteTeacher: (teacherId) => {
      dispatch(deleteTeacher(teacherId))
    },
    approveDetails: (teacherId) => {
      dispatch(approveDetails(teacherId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTeacher);
