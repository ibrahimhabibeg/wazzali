import React from 'react'
import { View } from 'react-native'
import useStore from '../Store/useStore'
import { Button } from 'react-native-paper'
import { distributeRoles } from '../Actions/actions'

const AssignRolesButton = (): React.JSX.Element => {
  const hasDistributed = useStore((state) => Boolean(state.team?.distribution))
  return (
    <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
      <Button
        onPress={distributeRoles}
        mode={'contained'}
        style={{ width: '85%' }}
      >
        {hasDistributed ? 'Reassign Roles' : 'Assign Roles'}
      </Button>
    </View>
  )
}

export default AssignRolesButton
