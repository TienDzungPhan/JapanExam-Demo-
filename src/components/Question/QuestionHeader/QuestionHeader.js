import React, { useState } from 'react'
import { AuthCheck } from 'reactfire'
import { getTimeDiff } from '../../../utils/getTimeDiff'
import UserAvatar from '../../UserAvatar'
import ToolsPopover from '../ToolsPopover'
import EditQuestionDialog from '../../EditQuestionDialog'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const QuestionHeader = ({ question }) => {
  // Tools Popover Anchor state
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null)
  // Edit Question open state
  const [editQuestionOpen, setEditQuestionOpen] = useState(false)
  return (
    <div className="QuestionHeader">
      <CardHeader
        avatar={
          <UserAvatar userId={question.authorId} />
        }
        action={
          <AuthCheck fallback=''>
            <IconButton
              aria-label="tools"
              aria-describedby={Boolean(toolsAnchorEl) ? `tools-${question.id}` : undefined}
              onClick={(e) => {
                console.log(e.currentTarget)
                setToolsAnchorEl(e.currentTarget)
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </AuthCheck>
        }
        title={question.authorName}
        subheader={getTimeDiff(question.createdAt.toDate())}
        titleTypographyProps={{ variant: 'inherit', component: 'strong' }}
        subheaderTypographyProps={{ variant: 'caption', component: 'small' }}
      />
      <AuthCheck fallback=''>
        <ToolsPopover
          question={question}
          anchorEl={toolsAnchorEl}
          setAnchorEl={setToolsAnchorEl}
          editQuestionOpen={editQuestionOpen}
          setEditQuestionOpen={setEditQuestionOpen}
        />
        <EditQuestionDialog
          editQuestionOpen={editQuestionOpen}
          setEditQuestionOpen={setEditQuestionOpen}
          question={question}
        />
      </AuthCheck>
    </div>
  )
}

export default QuestionHeader
