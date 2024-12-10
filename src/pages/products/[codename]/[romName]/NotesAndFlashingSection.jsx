
import React from "react";
import CopyableCommand from "../../../../components/CopyCommands"; 

const ROMSections = ({ notes, flashingSteps, prevBuildSteps }) => {
  const renderStepsWithCommandsAndWarnings = (steps) =>
    steps.map((step, index) => {
      const commandMatch = step.match(/\[command\](.*?)\[\/command\]/);
      const warningMatch = step.match(/\[warning\](.*?)\[\/warning\]/); 

      if (commandMatch) {
        const command = commandMatch[1]; 
        const textAfterCommand = step.replace(commandMatch[0], ""); 

        return (
          <div key={index} className="mb-2">
            <CopyableCommand command={command} />
            <span className="text-gray-300">{textAfterCommand}</span> 
          </div>
        );
      }

      if (warningMatch) {
        const warningText = warningMatch[1]; 
        const textAfterWarning = step.replace(warningMatch[0], ""); 

        return (
          <div key={index} className="mb-2">
            <div className="bg-red-100 text-red-800 p-4 rounded-2xl mb-2">
              <strong>Warning: </strong>
              {warningText}
            </div>
            <span className="text-gray-300">{textAfterWarning}</span>
          </div>
        );
      }

      return (
        <li key={index} className="text-gray-300">
          {step}
        </li>
      );
    });

  return (
    <>
      {/* Notes Section */}
      {notes && notes.length > 0 && (
        <div className="p-6 md:p-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">
            Notes <span className="text-red-500">*</span>
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {notes.map((item, index) => {
              const commandMatch = item.match(/\[command\](.*?)\[\/command\]/);
              const warningMatch = item.match(/\[warning\](.*?)\[\/warning\]/); 

              if (commandMatch) {
                const command = commandMatch[1];
                const textAfterCommand = item.replace(commandMatch[0], "");
                return (
                  <div key={index} className="mb-2">
                    <CopyableCommand command={command} />
                    <span className="text-gray-300">{textAfterCommand}</span>
                  </div>
                );
              }

              if (warningMatch) {
                const warningText = warningMatch[1];
                const textAfterWarning = item.replace(warningMatch[0], "");
                return (
                  <div key={index} className="mb-2 w-fit">
                    <div className="bg-red-100 text-red-800 p-4 rounded-2xl mb-2">
                      <strong>Warning: </strong>
                      {warningText}
                    </div>
                    <span className="text-gray-300 ">{textAfterWarning}</span>
                  </div>
                );
              }

              return (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Flashing Steps Section */}
      {flashingSteps && flashingSteps.length > 0 && (
        <div className="p-6 md:p-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">
            Flashing Steps
          </h2>
          <ul className="list-disc list-inside space-y-2 w-fit">
            {renderStepsWithCommandsAndWarnings(flashingSteps)}
          </ul>
        </div>
      )}

      {/* Flashing Steps If coming from previous build */}
      {prevBuildSteps && prevBuildSteps.length > 0 && (
        <div className="p-6 md:p-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4">
            Flashing Steps If coming from Android 14 custom ROMs
          </h2>
          <ul className="list-disc list-inside space-y-2 w-fit">
            {renderStepsWithCommandsAndWarnings(prevBuildSteps)}
          </ul>
        </div>
      )}
    </>
  );
};

export default ROMSections;
