node {
    stage 'Checkout'
    checkout scm


    def tagName = gitTagName()
    echo "Tag Name: $tagName"
    def build = (tagName ==~ /devtest-.*/);
    echo "Pass? $build"
    if (!build) {
      currentBuild.result = 'ABORTED'
      return
    }

    stage 'After'
    echo "lallalala"
}

// node {
//   checkout([
    // $class: 'GitSCM',
    // branches: [[name: '*/master']],
    // doGenerateSubmoduleConfigurations: false,
    // extensions: [ [$class: 'UserExclusion', excludedUsers: 'jenkins'], [$class: 'CleanBeforeCheckout'], [$class: 'LocalBranch', localBranch: 'master'] ],
    // userRemoteConfigs: [[
    // credentialsId: '53d2e8a9-0652-4bb3-a58d-94f9431fa94a',
    // url: "git@github.com:baniol/hapi-sample.git",
    // refspec: '+refs/heads/master:refs/remotes/origin/master' ]] ])
    // checkout([
    //     $class: 'GitSCM',
    //     branches: [[name: '*/master']],
    //     // userRemoteConfigs: [[
    //     //     refspec: 'refs/tags/devtest*'
    //     // ]]
    // ])
    // checkout([
    //      $class: 'GitSCM',
    //      branches: scm.branches,
    //      doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
    //      extensions: scm.extensions,
    //      userRemoteConfigs: scm.userRemoteConfigs
    // ])
    // sh 'git log -n 10 --graph --pretty=oneline --abbrev-commit --all --decorate=full'
// }

/** @return The tag name, or `null` if the current commit isn't a tag. */
String gitTagName() {
    commit = getCommit()
    if (commit) {
        desc = sh(script: "git describe --tags ${commit}", returnStdout: true)?.trim()
        if (isTag(desc)) {
            return desc
        }
    }
    return null
}

String getCommit() {
    return sh(script: 'git rev-parse HEAD', returnStdout: true)?.trim()
}

@NonCPS
boolean isTag(String desc) {
    match = desc =~ /.+-[0-9]+-g[0-9A-Fa-f]{6,}$/
    result = !match
    match = null // prevent serialisation
    return result
}
